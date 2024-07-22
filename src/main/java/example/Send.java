package example;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

import java.nio.charset.StandardCharsets;

public class Send {

    private final static String QUEUE_NAME = "Krankenhaus_Daten";

    public static void main(String[] argv) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {
            channel.queueDeclare(QUEUE_NAME, false, false, false, null);

            // Example of sending a patient message
            String personID = "PAT006";
            String vorname = "Lars";
            String nachname = "Zeppenfeld";
            String geburtsdatum = "1980-01-01 00:00:00";
            String hinweise = "Diabetiker";

            String patientMessage = "PATIENT:" + personID + "," + vorname + "," + nachname + "," + geburtsdatum + "," + hinweise;
            channel.basicPublish("", QUEUE_NAME, null, patientMessage.getBytes(StandardCharsets.UTF_8));
            System.out.println("Patient: '" + patientMessage + "' was sent successfully");

            String personIDfFuerPersonal = "PER006";
            String personalVorname = "Anna";
            String personalNachname = "Musterfrau";
            String personalGeburtsdatum = "1975-05-05 00:00:00";

            String personalMessage = "PERSONAL:" + personIDfFuerPersonal + "," + personalVorname + "," + personalNachname + "," + personalGeburtsdatum;
            channel.basicPublish("", QUEUE_NAME, null, personalMessage.getBytes(StandardCharsets.UTF_8));
            System.out.println("Personal: '" + personalMessage + "' was sent successfully");

            String auftragsID = "AUF006";
            String geplanterZeitpunkt = "2024-07-25 10:00:00";
            String patientPersonID = personID;

            String auftragMessage = "AUFTRAG:" + auftragsID + "," + geplanterZeitpunkt + "," + patientPersonID;
            channel.basicPublish("", QUEUE_NAME, null, auftragMessage.getBytes(StandardCharsets.UTF_8));
            System.out.println("Auftrag: '" + auftragMessage + "' wurde erfolgreich verschickt");

            String spaetesterEntnahmezeitpunkt = "2024-11-15 12:00:00";
            String grund = "Routine Check";
            String hinweiseFuerBlutprobe = "Super Wichtig";
            String personalPersonID = "PER006";
            String auftragsIDFuerBlutprobe = auftragsID;

            String blutprobeMessage = "BLUTPROBE:" +  spaetesterEntnahmezeitpunkt + "," + grund + "," + hinweiseFuerBlutprobe +  "," + personalPersonID + "," + auftragsIDFuerBlutprobe;
            channel.basicPublish("", QUEUE_NAME, null, blutprobeMessage.getBytes(StandardCharsets.UTF_8));
            System.out.println("Blutprobe: '" + blutprobeMessage + "' was sent successfully");
        }
    }
}