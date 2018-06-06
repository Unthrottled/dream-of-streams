package io.acari.streams;

import com.google.common.collect.Lists;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class PracticeStreamo {

    public static void main(String... args) {
        List<PodMember> podMembersEnhanced = Stream.of((
                "Alex Java,Java,Functional_Programming,Javascript,Fixing_bugs,Fun_Commit_Messages;" +
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
                                "Being Number One", "Spelling mistakes in his name")))
                        .build()
        );

        Pod pod = podMemberStream.collect(Pod::new, Pod::addPodMember, Pod::combinePod);

        String someInterests = pod.fetchPodMembers()
                .limit(2)
                .map(PodMember::getInterests)
                .map(Interests::getCoreInterests)
                .flatMap(Collection::stream)
                .distinct()
                .reduce((interest, newInterest) -> interest + ", " + newInterest)
                .orElseThrow(() -> new IllegalStateException("Bruv, there should be interests"));

        System.out.println(someInterests);

        Map<Boolean, Set<PodMember>> segregatedPodMembers = pod.fetchPodMembers()
                .collect(Collectors.partitioningBy(PodMember::areSane,
                        Collectors.toCollection(HashSet::new)));

        System.out.println(segregatedPodMembers.get(false));

        Map<String, PodMember> byName = pod.fetchPodMembers()
                .collect(Collectors.toMap(PodMember::getName, Function.identity()));

        System.out.println(byName);

        pod.addPodMember(PodMember.builder()
                .name("Alex")
                .interests(new Interests(Lists.newArrayList("Imitation")))
                .build());


        try {
            Map<String, PodMember> notGoingToWork = pod.fetchPodMembers()
                    .collect(Collectors.toMap(PodMember::getName, Function.identity()));
        } catch (Exception e) {
            e.printStackTrace();
        }

        Map<String, PodMember> thereCanOnlyBeOne = pod.fetchPodMembers()
                .collect(Collectors.toMap(PodMember::getName, Function.identity(), (original, imitator) -> original));

        System.out.println(thereCanOnlyBeOne);

        Map<Boolean, Set<PodMember>> saneAsylum = pod.fetchPodMembers()
                .collect(Collectors.groupingBy(PodMember::areSane,
                        Collectors.toCollection(HashSet::new)));

        System.out.println(saneAsylum);

        System.out.println("Done");
    }
}
