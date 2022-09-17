package Backend.Controller;

import Backend.DTO.OrderDTO;
import Backend.Model.Order;
import Backend.Service.Implementation.OrderServiceImplementation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@Validated
@RequestMapping("/Order")
public class OrderController {
    private final OrderServiceImplementation orderServiceImplementation;

    @GetMapping("/getName")
    public String getName() {
        return "vfcdx";
    }

    @PostMapping("/addOrder")
    public ResponseEntity addOrder(@RequestBody OrderDTO orderDTO){
        return ResponseEntity.status(HttpStatus.OK).body(orderServiceImplementation.addOrder(orderDTO));
    }

    @PostMapping("/update")
    public ResponseEntity update(@RequestBody Order order){
        return ResponseEntity.status(HttpStatus.OK).body(orderServiceImplementation.update(order));
    }
}