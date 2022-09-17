package Backend.Controller;

import Backend.Model.Ingredient;
import Backend.Service.Implementation.IngredientServiceImplementation;
import Backend.Service.IngredientService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@Controller
@CrossOrigin
@Validated
@RequestMapping("/Ingredient")
public class IngredientController {
    @Autowired
    private IngredientServiceImplementation ingredientServiceImplementation;

    @GetMapping("/getName1")
    public String getName() {
        return "cvghbkj";
    }

    @PostMapping("/readById")
    public ResponseEntity<Ingredient> readById(@RequestBody Long id) {
        System.out.println(ingredientServiceImplementation.readById(id));
        return new ResponseEntity<>(ingredientServiceImplementation.readById(id), HttpStatus.OK);
    }

    @PostMapping("/readByName")
    public ResponseEntity readByName(@RequestBody String name) {
        System.out.println(ingredientServiceImplementation.readByName(name));
        return ResponseEntity.status(HttpStatus.OK).body(ingredientServiceImplementation.readByName(name));
    }
    
    @PostMapping("/update")
    public ResponseEntity update(@RequestBody Ingredient ingredient){
        return ResponseEntity.status(HttpStatus.OK).body(ingredientServiceImplementation.update(ingredient));
    }
}
