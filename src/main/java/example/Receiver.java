package example;

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

public class Receiver {

    private final static String QUEUE_NAME = "Krankenhaus_Daten";

    public static void main(String[] argv) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();

        channel.queueDeclare(QUEUE_NAME, false, false, false, null);
        System.out.println(" [*] Warte auf Nachrichten.");

        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), StandardCharsets.UTF_8);
            System.out.println(" [x] Received '" + message + "'");
            saveToSQL(message);
        };
        channel.basicConsume(QUEUE_NAME, true, deliverCallback, consumerTag -> { });
    }

    public static void saveToSQL(String message) {
        if (message.startsWith("PATIENT:")) {
            savePatientToSQL(message.substring(8));
        } else if (message.startsWith("AUFTRAG:")) {
            saveAuftragToSQL(message.substring(8));
        } else if (message.startsWith("BLUTPROBE:")) {
            saveBlutprobeToSQL(message.substring(10));
        } else if (message.startsWith("PERSONAL:")) {
            savePersonalToSQL(message.substring(9));
        } else {
            System.err.println("Unknown message type");
        }
    }

    public static void savePatientToSQL(String message) {
        String[] parts = message.split(",");
        if (parts.length != 5) {
            System.err.println("Invalid patient message format");
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

    public static void saveAuftragToSQL(String message) {
        String[] parts = message.split(",");
        if (parts.length != 3) {
            System.err.println("Invalid auftrag message format");
            return;
        }

        String auftragsID = parts[0];
        String geplanterZeitpunktStr = parts[1];
        String patientPersonID = parts[2];

        try {
            java.sql.Connection connection = DriverManager.getConnection(
                    "jdbc:mysql://blutbase.mysql.database.azure.com:3306/blutentnahmebackend",
                    "blutadmin",
                    "MK9*FR!3kynqG_iBebsM78CH.XZ.dVYdTi2g_yByy2ekqdVHVGX"
            );

            String query = "INSERT INTO aufträge (AuftragsID, GeplanterZeitpunkt, PatientPersonID) VALUES (?, ?, ?)";
            try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                preparedStatement.setString(1, auftragsID);

                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Date parsedDate = dateFormat.parse(geplanterZeitpunktStr);
                java.sql.Timestamp timestamp = new java.sql.Timestamp(parsedDate.getTime());
                preparedStatement.setTimestamp(2, timestamp);

                preparedStatement.setString(3, patientPersonID);

                preparedStatement.executeUpdate();
            }
        } catch (SQLException | ParseException e) {
            e.printStackTrace();
        }
    }

    public static void saveBlutprobeToSQL(String message) {
        String[] parts = message.split(",");
        if (parts.length != 8) {
            System.err.println("Invalid blutprobe message format");
            return;
        }

        String rohrID = parts[0];
        String spaetesterEntnahmezeitpunktStr = parts[1];
        String grund = parts[2];
        String hinweise = parts[3];
        String entnahmeZeitpunktStr = parts[4];
        String personalPersonID = parts[5];
        String auftragsID = parts[6];
        String laborEingangStr = parts[7];

        try {
            java.sql.Connection connection = DriverManager.getConnection(
                    "jdbc:mysql://blutbase.mysql.database.azure.com:3306/blutentnahmebackend",
                    "blutadmin",
                    "MK9*FR!3kynqG_iBebsM78CH.XZ.dVYdTi2g_yByy2ekqdVHVGX"
            );

            String query = "INSERT INTO blutproben (RohrID, spätesterEntnahmezeitpunkt, Grund, Hinweise, EntnahmeZeitpunkt, PersonalPersonID, AuftragsID, LaborEingang) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                preparedStatement.setString(1, rohrID);

                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Date parsedDate = dateFormat.parse(spaetesterEntnahmezeitpunktStr);
                java.sql.Timestamp timestamp = new java.sql.Timestamp(parsedDate.getTime());
                preparedStatement.setTimestamp(2, timestamp);

                preparedStatement.setString(3, grund);
                preparedStatement.setString(4, hinweise);

                if (!entnahmeZeitpunktStr.isEmpty()) {
                    parsedDate = dateFormat.parse(entnahmeZeitpunktStr);
                    timestamp = new java.sql.Timestamp(parsedDate.getTime());
                    preparedStatement.setTimestamp(5, timestamp);
                } else {
                    preparedStatement.setNull(5, java.sql.Types.TIMESTAMP);
                }

                preparedStatement.setString(6, personalPersonID);
                preparedStatement.setString(7, auftragsID);

                if (!laborEingangStr.isEmpty()) {
                    parsedDate = dateFormat.parse(laborEingangStr);
                    timestamp = new java.sql.Timestamp(parsedDate.getTime());
                    preparedStatement.setTimestamp(8, timestamp);
                } else {
                    preparedStatement.setNull(8, java.sql.Types.TIMESTAMP);
                }

                preparedStatement.executeUpdate();
            }
        } catch (SQLException | ParseException e) {
            e.printStackTrace();
        }
    }

    public static void savePersonalToSQL(String message) {
        String[] parts = message.split(",");
        if (parts.length != 4) {
            System.err.println("Invalid personal message format");
            return;
        }

        String personID = parts[0];
        String vorname = parts[1];
        String nachname = parts[2];
        String geburtsdatumStr = parts[3];

        try {
            java.sql.Connection connection = DriverManager.getConnection(
                    "jdbc:mysql://blutbase.mysql.database.azure.com:3306/blutentnahmebackend",
                    "blutadmin",
                    "MK9*FR!3kynqG_iBebsM78CH.XZ.dVYdTi2g_yByy2ekqdVHVGX"
            );

            String query = "INSERT INTO personal (PersonID, Vorname, Nachname, Geburtsdatum) VALUES (?, ?, ?, ?)";
            try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                preparedStatement.setString(1, personID);
                preparedStatement.setString(2, vorname);
                preparedStatement.setString(3, nachname);

                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Date parsedDate = dateFormat.parse(geburtsdatumStr);
                java.sql.Timestamp timestamp = new java.sql.Timestamp(parsedDate.getTime());
                preparedStatement.setTimestamp(4, timestamp);

                preparedStatement.executeUpdate();
            }
        } catch (SQLException | ParseException e) {
            e.printStackTrace();
        }
    }
}