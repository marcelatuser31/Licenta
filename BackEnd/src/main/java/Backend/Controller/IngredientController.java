package Backend.Controller;

import Backend.Model.Ingredient;
import Backend.Service.Implementation.IngredientServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Controller
@CrossOrigin
@Validated
@RequestMapping("/Ingredient")
public class IngredientController {
    @Autowired
    private IngredientServiceImplementation ingredientServiceImplementation;

    @PostMapping("/readById")
    public ResponseEntity<Ingredient> getById(@RequestBody UUID id) {
        return new ResponseEntity<>(ingredientServiceImplementation.getById(id), HttpStatus.OK);
    }

    @PostMapping("/insert")
    public ResponseEntity insert(@RequestBody String name){
        ingredientServiceImplementation.insert(name);
        return  null;
    }

    @PostMapping("/readByName")
    public ResponseEntity getByName(@RequestBody String name) {
        return ResponseEntity.status(HttpStatus.OK).body(ingredientServiceImplementation.getByName(name));
    }

    @PostMapping("/update")
    public ResponseEntity update(@RequestBody Ingredient ingredient){
        return ResponseEntity.status(HttpStatus.OK).body(ingredientServiceImplementation.update(ingredient));
    }
}
