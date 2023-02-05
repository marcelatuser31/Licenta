package Backend.Controller;

import Backend.Model.Drink;
import Backend.Service.Implementation.DrinkServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Controller
@CrossOrigin
@Validated
@RequestMapping("/Drink")
public class DrinkController {
    @Autowired
    private DrinkServiceImplementation drinkServiceImplementation;

    @PostMapping("/getById")
    public ResponseEntity getById(@RequestBody UUID id) {
        return ResponseEntity.status(HttpStatus.OK).body(drinkServiceImplementation.getById(id));
    }

    @GetMapping("/getAll")
    public ResponseEntity getAll() {
        return ResponseEntity.status(HttpStatus.OK).body(drinkServiceImplementation.getAll());
    }

    @PostMapping("/addDrink")
    public ResponseEntity addDrink(@RequestBody Drink drink) {
        return ResponseEntity.status(HttpStatus.OK).body(drinkServiceImplementation.addDrink(drink));
    }

    @PostMapping("/update")
    public ResponseEntity update(@RequestBody Drink drink){
        drinkServiceImplementation.update(drink);
        return ResponseEntity.status(HttpStatus.OK).body(drinkServiceImplementation.getAll());
    }

    @PostMapping(value="/addImage", consumes={"multipart/form-data"})
    public ResponseEntity addImage(@RequestParam (value="image", required = false) MultipartFile image, @RequestParam(value="id") UUID id){
        return ResponseEntity.status(HttpStatus.OK).body(drinkServiceImplementation.addDrinkImage(id, image));
    }

    @PostMapping("/deleteDrink")
    public void deleteDrink(@RequestBody String id){
        drinkServiceImplementation.deleteDrink(UUID.fromString(id.substring(0,id.length()-1)));
    }
}