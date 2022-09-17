package Backend.Controller;

import Backend.Model.Person;
import Backend.Service.Implementation.PersonServiceImplementation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@Validated
@RequestMapping("/Person")
public class PersonController {
    private final PersonServiceImplementation personServiceImplementation;

    @GetMapping("/getName")
    public String getName() {
        return "gfvd";
    }

    @GetMapping("/getAll")
    public ResponseEntity getAll() {
        return ResponseEntity.status(HttpStatus.OK).body(personServiceImplementation.getAllPerson());
    }

    @PostMapping("/register")
    public void register(@RequestBody Person person) {
        personServiceImplementation.register(person);
    }

    @PostMapping("/update")
    public ResponseEntity update(@RequestBody Person person){
        return ResponseEntity.status(HttpStatus.OK).body(personServiceImplementation.update(person));
    }
}