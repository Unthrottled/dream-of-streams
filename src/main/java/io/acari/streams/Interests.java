package io.acari.streams;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

@Data
@AllArgsConstructor
public class Interests {
    private List<String> coreInterests = new ArrayList<>();

    public boolean areSane() {
        return coreInterests.stream()
                .map(String::toLowerCase)
                .noneMatch(interest -> interest.contains("bug") || interest.contains("spider"));
    }

    public boolean hasInterest(String java) {
        return coreInterests.stream()
                .map(String::toLowerCase)
                .anyMatch(interest-> interest.contains(java));
    }

    public Stream<String> interestsAsStream(){
        return coreInterests.stream();
    }
}
