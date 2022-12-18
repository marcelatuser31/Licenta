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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Float price;
    private Float weight;
    private Integer amount;
    @ManyToMany(fetch = FetchType.EAGER,cascade = CascadeType.DETACH)
    private List<Ingredient> ingredients;
    private CakeType type;
    private LocalDateTime expirationDate;
    @Lob
    @Type(type = "org.hibernate.type.ImageType")
    private byte[] image;
}
