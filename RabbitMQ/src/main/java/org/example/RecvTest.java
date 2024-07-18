package org.example;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;

import java.nio.charset.StandardCharsets;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class RecvTest {

    private final static String QUEUE_NAME = "Patienten";

    public static void main(String[] argv) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();

        channel.queueDeclare(QUEUE_NAME, false, false, false, null);
        System.out.println(" [*] Waiting for messages. To exit press CTRL+C");

        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), StandardCharsets.UTF_8);
            System.out.println(" [x] Received '" + message + "'");
            saveToSQL(message);
        };
        channel.basicConsume(QUEUE_NAME, true, deliverCallback, consumerTag -> { });
    }

    public static void saveToSQL(String message) {
        // Assume message format: PersonID,Vorname,Nachname,Geburtsdatum,Hinweise
        String[] parts = message.split(",");
        if (parts.length != 5) {
            System.err.println("Invalid message format");
            return;
        }

        String personID = parts[0];
        String vorname = parts[1];
        String nachname = parts[2];
        String geburtsdatumStr = parts[3];
        String hinweise = parts[4];

        try {
            java.sql.Connection connection = DriverManager.getConnection(
                    "jdbc:mysql://blutbase.mysql.database.azure.com:3306/blutentnahmebackend",
                    "blutadmin",
                    "MK9*FR!3kynqG_iBebsM78CH.XZ.dVYdTi2g_yByy2ekqdVHVGX"
            );

            String query = "INSERT INTO patienten (PersonID, Vorname, Nachname, Geburtsdatum, Hinweise) VALUES (?, ?, ?, ?, ?)";
            try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                preparedStatement.setString(1, personID);
                preparedStatement.setString(2, vorname);
                preparedStatement.setString(3, nachname);

                // Parse the date string to java.sql.Timestamp
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Date parsedDate = dateFormat.parse(geburtsdatumStr);
                java.sql.Timestamp timestamp = new java.sql.Timestamp(parsedDate.getTime());
                preparedStatement.setTimestamp(4, timestamp);

                preparedStatement.setString(5, hinweise);

                preparedStatement.executeUpdate();
            }
        } catch (SQLException | ParseException e) {
            e.printStackTrace();
        }
    }
}
