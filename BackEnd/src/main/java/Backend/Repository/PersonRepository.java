package Backend.Repository;

import Backend.Model.Person;
import Backend.Model.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonRepository extends CrudRepository<Person,Long> {
    Person findFirstById(Long Id);
    Person findFirstByRole(Role role);
}
