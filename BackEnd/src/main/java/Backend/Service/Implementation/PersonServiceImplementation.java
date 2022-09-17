package Backend.Service.Implementation;

import Backend.Model.Person;
import Backend.Repository.PersonRepository;
import Backend.Service.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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
}


