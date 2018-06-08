package io.acari.streams;

import com.google.common.base.Strings;
import com.google.common.collect.LinkedListMultimap;
import com.google.common.collect.Lists;
import com.google.common.collect.Multimap;
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
                                "Being Number One", "Spelling mistakes in his name")))
                        .build()
        );

        Pod pod = podMemberStream.collect(Pod::new, Pod::addPodMember, Pod::combinePod);


        pod.addPodMember(PodMember.builder()
                .name("Alex")
                .interests(new Interests(Lists.newArrayList("Imitation", "Not being real")))
                .build());


        Map<String, Map<String, List<PodMember>>> typeaheadInterests = pod.fetchPodMembers()
                .distinct()
                .flatMap(podMember -> podMember.getInterests().interestsAsStream().map(interest -> new AbstractMap.SimpleEntry<>(interest, podMember)))
                .flatMap(stringPodMemberSimpleEntry -> {
                    Stream.Builder<AbstractMap.SimpleEntry<String, AbstractMap.SimpleEntry<String, PodMember>>> bob = Stream.builder();
                    String interest = stringPodMemberSimpleEntry.getKey();
                    for (int i = 0; i < interest.length(); i++) {
                        for (int j = i + 1; j <= interest.length(); j++) {
                            bob.accept(new AbstractMap.SimpleEntry<>(interest.substring(i, j),
                                    stringPodMemberSimpleEntry));
                        }
                    }
                    return bob.build().parallel();
                })
                .collect(Collectors.groupingBy(Map.Entry::getKey,
                        Collectors.mapping(Map.Entry::getValue,
                                Collectors.groupingBy(Map.Entry::getKey,
                                        Collectors.mapping(Map.Entry::getValue, Collectors.toList())))));

        System.out.println(typeaheadInterests.get("Jav"));


        List<String> sortedInterests = pod.fetchPodMembers().map(PodMember::getInterests)
                .flatMap(Interests::interestsAsStream)
                .sorted()
                .collect(Collectors.toList());

        System.out.println(sortedInterests);

//        - The identity must be defined such that for all elements in the stream u ,
//        - combiner.apply(identity, u) is equal to u .
//
//        - The accumulator operator op must be associative and stateless such that (a op b) op c
//        - is equal to a op (b op c) . (1 + 2) + 3 == 1 + (2 + 3)
//
//        - The combiner operator must also be associative and stateless and compatible with the
//        - identity, such that for all u and t combiner.apply(u,accumulator.apply(identity,t))
//                - is equal to accumulator.apply(u,t) .

        List<String> alsoInterests = sortedInterests.stream()
                .unordered()
                .parallel()
                .collect(() -> {
                    System.out.println("New Identity");
                    return new LinkedList<String>();
                }, LinkedList::add, (strings, c) -> {
                    System.out.println("Joining fork results");
                    strings.addAll(c);
                });

        System.out.println(alsoInterests);


        System.out.println("Done");
    }
}
