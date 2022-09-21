package Backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
@Data
public class OrderResponseDTO {
    private Float suma;
    private List<String> errorMessages;

    public OrderResponseDTO(Float suma, List<String> errorMessages) {
        this.suma = suma;
        this.errorMessages = errorMessages;
    }
}