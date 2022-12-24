package Backend.Model;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Data
public class CreditCard implements Serializable {
    @Id
    @GenericGenerator(name="UUID", strategy = "uuid2")
    @GeneratedValue(generator = "UUID")
    private UUID id;
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    private Person person;
    private String cardNumber;
    private String cardHolder;
    private String expireMonth;
    private String expireYear;
}
