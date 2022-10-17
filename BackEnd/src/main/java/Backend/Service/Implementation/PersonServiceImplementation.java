package Backend.Service.Implementation;

import Backend.Methods;
import Backend.Model.Person;
import Backend.Repository.PersonRepository;
import Backend.Service.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.util.List;
import java.util.Properties;

@Service
@RequiredArgsConstructor
public class PersonServiceImplementation implements PersonService {
    private final PersonRepository personRepository;

    @Override
    public Person readById(Long id) {
        return personRepository.findFirstById(id);
    }

    @Override
    public List<Person> getAllPerson() {
        return (List<Person>) personRepository.findAll();
    }

    @Override
    public void register(Person person) {
        personRepository.save(person);
        String message = "Username-ul tau este " + person.getRole().getUsername() + " si parola" + person.getRole().getPassword();
        sendEmail(person.getRole().getEmail(), message);
    }

    @Override
    public Person update(Person person) {
        Person dbPerson = personRepository.findFirstById(person.getId());

        dbPerson.setName(person.getName());
        dbPerson.setAddress(person.getAddress());
        dbPerson.setPhone(person.getPhone());
        dbPerson.setRole(person.getRole());
        personRepository.save(dbPerson);
        return dbPerson;
    }

    @Override
    public void sendEmail(String email, String message) {
        String username = "tusermarcela@gmail.com";
        String password = "gfwamfomwdoisskn";

        Properties properties = new Properties();
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.port", "465");
        properties.put("mail.smtp.ssl.enable", "true");
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");

        Session session = Session.getInstance(properties, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        //Start our mail message
        MimeMessage msg = new MimeMessage(session);
        try {
            msg.setFrom(new InternetAddress(username));
            msg.addRecipient(Message.RecipientType.TO, new InternetAddress(email));
            msg.setSubject("New Account");
            BodyPart messageBodyPart = new MimeBodyPart();
            Multipart multipart = new MimeMultipart();
            multipart.addBodyPart(messageBodyPart);
            messageBodyPart.setContent(
                    Methods.getMessageContent(message),"text/html"
            );
            msg.setContent(multipart);
            Transport.send(msg);
            System.out.println("send");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

