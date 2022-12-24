package Backend.DTO;

import lombok.Data;

import java.util.UUID;

@Data
public class CreditCardDTO {
    private UUID personId;
    private String cardNumber;
    private String cardHolder;
    private String expireMonth;
    private String expireYear;
}
