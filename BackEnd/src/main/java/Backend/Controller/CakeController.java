package Backend.Controller;

import Backend.Model.Cake;
import Backend.Model.Ingredient;
import Backend.Service.Implementation.CakeServiceImplementation;
import Backend.Utils.CakeType;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
    @Autowired
    private CakeServiceImplementation cakeServiceImplementation;

    @PostMapping("/readById")
    public ResponseEntity readById(@RequestBody Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(cakeServiceImplementation.readById(id));
    }

    @PostMapping("/getIngredientsByCakeId")
    public ResponseEntity getIngredientsByCakeId(@RequestBody Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(cakeServiceImplementation.getIngredientsByCakeId(id));
    }

    @GetMapping("/getName")
    public String getName() {
        return "Cake";
    }

    @GetMapping("/getAll")
    public ResponseEntity getAll() {
        return ResponseEntity.status(HttpStatus.OK).body(cakeServiceImplementation.getAll());
    }

    @PostMapping("/getTotalPrice")
    public ResponseEntity getTotalPrice(@RequestBody List<Long> cakeIds) {
        return ResponseEntity.status(HttpStatus.OK).body(cakeServiceImplementation.getTotalPrice(cakeIds));
    }

    @PostMapping("/update")
    public void update(@RequestBody Cake cake) {
        cakeServiceImplementation.update(cake);

    }

    @PostMapping("/readByType")
    public ResponseEntity readByType(@RequestBody CakeType type) {
        return ResponseEntity.status(HttpStatus.OK).body(cakeServiceImplementation.readByType(type));
    }

    @GetMapping("/getExpiredCakes")
    public ResponseEntity getExpiredCakes() {
        return ResponseEntity.status(HttpStatus.OK).body(cakeServiceImplementation.getExpiredCakes());
    }

    @PostMapping("/deleteCake")
    public void deleteCake(@RequestBody Long id) {
        cakeServiceImplementation.deleteCake(id);
    }

    @GetMapping("/getCakeTypes")
    public ResponseEntity getCakeTypes(){
        return ResponseEntity.status(HttpStatus.OK).body(cakeServiceImplementation.getCakeTypes());
    }
}
