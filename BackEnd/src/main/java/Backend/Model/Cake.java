package Backend.Model;

import lombok.*;

import javax.persistence.*;
import java.util.List;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Data
public class Cake {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Float price;
    private Float weight;
    private Integer amount;
    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    private List<Ingredient> ingredients;
}
