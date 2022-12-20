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
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/Cake")
public class CakeController {
    @Autowired
    private CakeServiceImplementation cakeServiceImplementation;

    @PostMapping("/getById")
    public ResponseEntity getById(@RequestBody UUID id) {
        return ResponseEntity.status(HttpStatus.OK).body(cakeServiceImplementation.getById(id));
    }

    @PostMapping("/getIngredientsByCakeId")
    public ResponseEntity getIngredientsByCakeId(@RequestBody UUID id) {
        return ResponseEntity.status(HttpStatus.OK).body(cakeServiceImplementation.getIngredientsByCakeId(id));
    }

    @GetMapping("/getAll")
    public ResponseEntity getAll() {
        return ResponseEntity.status(HttpStatus.OK).body(cakeServiceImplementation.getAll());
    }

    @PostMapping("/update")
    public void update(@RequestBody Cake cake) {
        cakeServiceImplementation.update(cake);
    }

    @PostMapping("/getByType")
    public ResponseEntity getByType(@RequestBody CakeType type) {
        return ResponseEntity.status(HttpStatus.OK).body(cakeServiceImplementation.getByType(type));
    }

    @PostMapping("/deleteCake")
    public void deleteCake(@RequestBody UUID id) {
        cakeServiceImplementation.deleteCake(id);
    }

    @GetMapping("/getCakeTypes")
    public ResponseEntity getCakeTypes(){
        return ResponseEntity.status(HttpStatus.OK).body(cakeServiceImplementation.getCakeTypes());
    }

    @PostMapping(value="/addImage", consumes={"multipart/form-data"})
    public ResponseEntity addImage(@RequestParam (value="image", required = false) MultipartFile image, @RequestParam(value="id") UUID id){
        return ResponseEntity.status(HttpStatus.OK).body(cakeServiceImplementation.addCakeImage(id, image));
    }

    @PostMapping("/addCake")
    public ResponseEntity addCake(@RequestBody Cake cake){
        return ResponseEntity.status(HttpStatus.OK).body(cakeServiceImplementation.addCake(cake));
    }
}
