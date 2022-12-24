package Backend.Repository;

import Backend.Model.CreditCard;
import Backend.Model.Person;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CreditCardRepository extends CrudRepository<CreditCard,Long> {
    CreditCard findFirstByPerson(Person person);
}
