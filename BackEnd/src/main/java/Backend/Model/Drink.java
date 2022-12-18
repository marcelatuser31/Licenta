package Backend.Model;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data
public class Drink implements Serializable {
    @Id
    @GenericGenerator(name="UUID", strategy = "uuid2")
    @GeneratedValue(generator = "UUID")
    private UUID id;
    private String name;
    private Float weight;
    private Float price;
    private Integer amount;
    @Lob
    @Type(type = "org.hibernate.type.ImageType")
    private byte[] image;
}
