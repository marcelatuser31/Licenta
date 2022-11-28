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
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/Cake")
public class CakeController {
    @Autowired
    private CakeServiceImplementation cakeServiceImplementation;

    @PostMapping("/getById")
    public ResponseEntity getById(@RequestBody Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(cakeServiceImplementation.getById(id));
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

    @PostMapping("/getByType")
    public ResponseEntity getByType(@RequestBody CakeType type) {
        if (type.ordinal() == -1)
            type = CakeType.Car;
        return ResponseEntity.status(HttpStatus.OK).body(cakeServiceImplementation.getByType(type));
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

    @PostMapping(value="/addImage", consumes={"multipart/form-data"})
    public ResponseEntity addImage(@RequestParam (value="image", required = false) MultipartFile image, @RequestParam(value="cakeId") String cakeId){
        return ResponseEntity.status(HttpStatus.OK).body(cakeServiceImplementation.addCakeImage(Long.parseLong(cakeId), image));
    }
}
