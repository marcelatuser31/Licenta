package Backend.DTO;

import Backend.Model.Cake;
import lombok.Data;

import java.util.List;

@Data
public class OrderDTO {
    Long id;
    List<CakeDTO> cakes;
    List<DrinkDTO> drinks;
}
