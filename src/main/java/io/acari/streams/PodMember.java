package io.acari.streams;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PodMember {
    private String name;
    private Interests interests;

    public boolean areSane(){
        return interests.areSane();
    }
}