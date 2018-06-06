package io.acari.streams;

import com.google.common.collect.Lists;

import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class PracticeStreamo {

    public static void main(String... args){
        List<PodMember> podMembersEnhanced = Stream.of((
                "Alex Java,Functional_Programming,Javascript,Fixing_bugs,Fun_Commit_Messages;" +
                        "Steve Cobol,Ada,Java,Groovy,Pineapples,Sunday_Mornings;" +
                        "Amy Javascript,HTML,CSS,Spiders,Assembly;" +
                        "Chad PHP,Java,Ruby,Purple_Stuff,Anime;" +
                        "Mira Python,Ruby,Whitespaces,Java,Lombok,Curly_Brace_Placement").split(";"))
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

        List<String> allInterests = pod.fetchPodMembers()
                .map(PodMember::getInterests)
                .map(Interests::getCoreInterests)
                .flatMap(Collection::stream)
                .distinct()
                .collect(Collectors.toList());

        System.out.print(allInterests);

        System.out.println("Done");
    }
}
