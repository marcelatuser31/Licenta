package Backend.Model;

import lombok.*;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data
public class Drink implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Float weight;
    private Float price;
    private Integer amount;
    @Lob
    @Type(type = "org.hibernate.type.ImageType")
    private byte[] image;
}
