package Backend.Model;

import Backend.Utils.CakeType;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Data
public class Cake {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private String name;
    private Float price;
    private Float weight;
    private Integer amount;
    @OneToMany(fetch = FetchType.EAGER ,cascade = CascadeType.ALL)
    private List<Ingredient> ingredients;
    private CakeType type;
    private LocalDateTime expirationDate;
    private byte[] image;
}
