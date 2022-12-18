package Backend.Model;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data
public class Ingredient implements Serializable {
    @Id
    @GenericGenerator(name="UUID2", strategy = "uuid2")
    @GeneratedValue(generator = "UUID2")
    private UUID id;
    private String name;
}
