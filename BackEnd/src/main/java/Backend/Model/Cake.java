package Backend.Model;

import Backend.Utils.CakeType;
import lombok.*;
import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import org.hibernate.annotations.Type;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Data
public class Cake implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private Float price;
    private Float weight;
    private Integer amount;
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Ingredient> ingredients;
    private CakeType type;
    private LocalDateTime expirationDate;
    @Lob
    @Type(type = "org.hibernate.type.ImageType")
    private byte[] image;
}
