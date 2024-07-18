package org.example;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

import java.nio.charset.StandardCharsets;

public class SendPatient {

    private final static String QUEUE_NAME = "Patienten";

    public static void main(String[] argv) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {
            channel.queueDeclare(QUEUE_NAME, false, false, false, null);


            String personID = "PAT006";
            String vorname = "Max";
            String nachname = "Mustermann";
            String geburtsdatum = "1980-01-01 00:00:00";
            String hinweise = "Diabetiker";

            String message = personID + "," + vorname + "," + nachname + "," + geburtsdatum + "," + hinweise;

            channel.basicPublish("", QUEUE_NAME, null, message.getBytes(StandardCharsets.UTF_8));
            System.out.println("Patient: '" + message + "' was succesful");
        }
    }
}

