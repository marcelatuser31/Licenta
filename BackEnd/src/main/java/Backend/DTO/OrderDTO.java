package Backend.DTO;

import Backend.Model.Cake;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class OrderDTO {
    UUID id;
    List<CakeDTO> cakes;
    List<DrinkDTO> drinks;
}
