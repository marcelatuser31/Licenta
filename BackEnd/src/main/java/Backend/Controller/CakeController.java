package Backend.Controller;

import Backend.Model.Cake;
import Backend.Model.Ingredient;
import Backend.Service.Implementation.CakeServiceImplementation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/Cake")
public class CakeController {

    private final CakeServiceImplementation cakeServiceImplementation;

    @PostMapping("/readCakeById")
    public ResponseEntity readById(@RequestBody Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(cakeServiceImplementation.readById(id));
    }
    @PostMapping("/getIngredientsByCakeId")
    public ResponseEntity getIngredientsByCakeId(@RequestBody Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(cakeServiceImplementation.getIngredientsByCakeId(id));
    }

    @GetMapping("/getName")
    public String getName(){
        return "bvdc";
    }

    @GetMapping("/getAll")
    public ResponseEntity getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(cakeServiceImplementation.getAll());
    }

    @PostMapping("/getTotalPrice")
    public ResponseEntity getTotalPrice(@RequestBody List<Long> cakeIds){
        return ResponseEntity.status(HttpStatus.OK).body(cakeServiceImplementation.getTotalPrice(cakeIds));
    }

    @PostMapping("/update")
    public ResponseEntity update(@RequestBody Cake cake){
        return ResponseEntity.status(HttpStatus.OK).body(cakeServiceImplementation.update(cake));
    }
}
