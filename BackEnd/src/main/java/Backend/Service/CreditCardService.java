package Backend.Service;

import Backend.DTO.CreditCardDTO;
import Backend.Model.CreditCard;
import Backend.Model.Person;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public interface CreditCardService {
    void addCreditCard (CreditCardDTO creditCardDTO);
    CreditCard getByPerson(Person person);
}