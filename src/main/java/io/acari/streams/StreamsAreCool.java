package io.acari.streams;

import com.google.common.base.Strings;
import com.google.common.collect.Lists;
import com.google.common.collect.Sets;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;
import java.util.function.Function;
import java.util.stream.*;

public class StreamsAreCool {

    public static void main(String... args) {

        List<PodMember> podMembersEnhanced = Stream.of((
                "Alex Java,Functional_Programming,Javascript,Fixing_bugs,Fun_Commit_Messages;" +
                        "Steve Cobol,Cobol,Ada,Java,Groovy,Pineapples,Sunday_Mornings;" +
                        "Amy Javascript,Javascript,HTML,CSS,Spiders,Assembly;" +
                        "Chad PHP,PHP,Java,Ruby,Purple_Stuff,Anime;" +
                        "Mira Python,Python,Ruby,Whitespaces,Java,Lombok,Curly_Brace_Placement").split(";"))
                .map(podMemberInfo -> {
                    String[] split = podMemberInfo.split(" ");
                    return PodMember.builder()
                            .name(split[0])
                            .interests(new Interests(Lists.newArrayList(split[1].split(","))))
                            .build();
                })
                .collect(Collectors.toList());

        Stream<PodMember> podMemberStream = podMembersEnhanced.stream();
        podMembersEnhanced.add(
                PodMember.builder()
                        .name("Smitty Werberjagermangensen")
                        .interests(new Interests(Lists.newArrayList("Having are really long name",
                                "Being Number One","Spelling mistakes in his name")))
                        .build()
        );

        Pod pod = podMemberStream.collect(Pod::new, Pod::addPodMember, Pod::combinePod);



        System.out.println("Done");
    }
}

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
class Pod {
    private Set<PodMember> podMembers = new HashSet<>();

    public Pod addPodMember(PodMember podMember){
        podMembers.add(podMember);
        return this;
    }

    public Pod combinePod(Pod otherPod){
        podMembers.addAll(otherPod.getPodMembers());
        return this;
    }

    public Stream<PodMember> fetchPodMembers(){
        return podMembers.stream();
    }
}


@Data
@Builder
class PodMember {
    private String name;
    private Interests interests;

    public boolean areSane(){
        return interests.areSane();
    }
}

@Data
@AllArgsConstructor
class Interests {
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
}
