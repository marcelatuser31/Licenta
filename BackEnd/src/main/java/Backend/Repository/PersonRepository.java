package Backend.Repository;

import Backend.Model.Person;
import Backend.Model.Role;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PersonRepository extends CrudRepository<Person,Long> {
    Person findFirstById(UUID Id);
    Person findFirstByRole(Role role);
}