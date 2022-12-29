package Backend.DTO;

import Backend.Model.Cake;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class OrderDTO {
    private UUID id;
    private List<CakeDTO> cakes;
    private List<DrinkDTO> drinks;
    private String address;
    private String paymentMethod;
}