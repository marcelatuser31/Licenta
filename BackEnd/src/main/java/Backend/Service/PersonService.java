package Backend.Service;

import Backend.Model.Person;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public interface PersonService {
    Person readById(Long id);
    List <Person> getAllPerson();
    void register(Person person);
    Person update(Person person);
    void sendEmail(String email, String message);
}
