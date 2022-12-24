package Backend.Service;

import Backend.DTO.CreditCardDTO;
import Backend.Model.CreditCard;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public interface CreditCardService {
    void addCreditCard (CreditCardDTO creditCardDTO);
    CreditCard getByPerson(UUID id);
}
