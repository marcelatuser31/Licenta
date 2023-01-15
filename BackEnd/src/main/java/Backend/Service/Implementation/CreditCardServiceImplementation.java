package Backend.Service.Implementation;

import Backend.DTO.CreditCardDTO;
import Backend.Model.CreditCard;
import Backend.Model.Person;
import Backend.Repository.CreditCardRepository;
import Backend.Repository.PersonRepository;
import Backend.Service.CreditCardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CreditCardServiceImplementation implements CreditCardService {
    private final CreditCardRepository creditCardRepository;
    private final PersonRepository personRepository;

    @Override
    public void addCreditCard(CreditCardDTO creditCardDTO) {
        CreditCard dbCreditCard = creditCardRepository.findFirstByCardNumber(creditCardDTO.getCardNumber());
        if (dbCreditCard != null)
            return;
        Person person = personRepository.findFirstById(creditCardDTO.getPersonId());

        CreditCard creditCard = new CreditCard(UUID.randomUUID(), person, creditCardDTO.getCardNumber(), creditCardDTO.getCardHolder(), creditCardDTO.getExpireMonth(), creditCardDTO.getExpireYear());
        creditCardRepository.save(creditCard);
    }

    @Override
    public CreditCard getByPerson(Person person) {
        CreditCard creditCard = creditCardRepository.findFirstByPerson(person);
        return creditCard;
    }
}