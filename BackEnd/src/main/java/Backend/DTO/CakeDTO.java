package Backend.DTO;

import lombok.Data;

import java.util.UUID;

@Data
public class CakeDTO {
    private UUID id;
    private Integer amount;
    private Float price;
}