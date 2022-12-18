package Backend.Service;

import Backend.Model.Person;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Component
public interface PersonService {
    Person readById(UUID id);
    List <Person> getAllPerson();
    void register(Person person);
    Person update(Person person);
    void sendEmail(String email, String message, String subject);
    Person addPersonImage(UUID id, MultipartFile image);
}
