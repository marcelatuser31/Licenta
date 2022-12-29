package Backend.Controller;

import Backend.DTO.CreditCardDTO;
import Backend.Model.Person;
import Backend.Service.Implementation.CreditCardServiceImplementation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/CreditCard")
public class CreditCardController {
    @Autowired
    private CreditCardServiceImplementation creditCardServiceImplementation;

    @PostMapping("/addCreditCard")
    public void addCreditCard(@RequestBody CreditCardDTO creditCardDTO) {
        creditCardServiceImplementation.addCreditCard(creditCardDTO);
    }

    @PostMapping("/getByPerson")
    public ResponseEntity getByPerson(@RequestBody Person person) {
        return ResponseEntity.status(HttpStatus.OK).body(creditCardServiceImplementation.getByPerson(person));
    }
}