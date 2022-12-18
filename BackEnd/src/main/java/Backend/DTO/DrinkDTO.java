package Backend.DTO;

import lombok.Data;

import java.util.UUID;

@Data
public class DrinkDTO {
    private UUID id;
    private Integer amount;
    private Float price;
}
