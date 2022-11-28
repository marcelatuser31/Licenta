package Backend.Controller;

import Backend.Service.Implementation.DrinkServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin
@Validated
@RequestMapping("/Drink")
public class DrinkController {
    @Autowired
    private DrinkServiceImplementation drinkServiceImplementation;

    @PostMapping("/getById")
    public ResponseEntity getById(@RequestBody Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(drinkServiceImplementation.getById(id));
    }

    @GetMapping("/getAll")
    public ResponseEntity getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(drinkServiceImplementation.getAll());
    }
}
