package Backend.Model;

import Backend.Utils.RoleType;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@ToString
@Data
public class Person implements Serializable {
    @Id
    @GenericGenerator(name="UUID", strategy = "uuid2")
    @GeneratedValue(generator = "UUID")

    private UUID id;
    private String name;
    private String address;
    private String phone;
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Role role;
    private boolean isActive;
    @Lob
    @Type(type = "org.hibernate.type.ImageType")
    private byte[] image;
}
