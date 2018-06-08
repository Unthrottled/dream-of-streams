package io.acari.streams.practice;

import com.google.common.collect.LinkedListMultimap;
import com.google.common.collect.Lists;
import com.google.common.collect.Multimap;
import io.acari.streams.Interests;
import io.acari.streams.Pod;
import io.acari.streams.PodMember;

import javax.swing.plaf.synth.SynthOptionPaneUI;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class PracticeMakesStreamo {

    public static void main(String... args) {
        List<PodMember> podMembersEnhanced = Stream.of((
                "Alex Java,Java,Functional_Programming,Javascript,Fixing_bugs,Fun_Commit_Messages;" +
                        "Steve Cobol,Cobol,Ada,Java,Groovy,Pineapples,Sunday_Mornings;" +
                        "Amy Javascript,Javascript,HTML,CSS,Spiders,Assembly;" +
                        "Chad PHP,PHP,Java,Ruby,Purple_Stuff,Anime;" +
                        "Mira Python,Python,Ruby,Whitespaces,Javascript,Lombok,Curly_Brace_Placement").split(";"))
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
                .interests(new Interests(Lists.newArrayList("Imitation", "Being Fake")))
                .build());

        Map<String, Set<PodMember>> typeAhead = pod.fetchPodMembers()
                .flatMap(podMember -> podMember.getInterests()
                        .getCoreInterests()
                        .stream()
                        .map(interest -> new AbstractMap.SimpleEntry<>(interest, podMember)))
                .flatMap(stringPodMemberSimpleEntry -> {
                    Stream.Builder<Map.Entry<String, PodMember>> bob = Stream.builder();
                    String intrest = stringPodMemberSimpleEntry.getKey();
                    for (int i = 0; i < intrest.length(); i++) {
                        for (int j = i + 1; j <= intrest.length(); j++) {
                            bob.accept(new AbstractMap.SimpleEntry<>(intrest.substring(i,j), stringPodMemberSimpleEntry.getValue()));
                        }
                    }
                    return bob.build().parallel();
                })
                .collect(Collectors.groupingBy(Map.Entry::getKey,
                        Collectors.mapping(Map.Entry::getValue, Collectors.toSet())));

        List<String> sortedInterests = pod.fetchPodMembers()
                .map(PodMember::getInterests)
                .map(Interests::getCoreInterests)
                .flatMap(List::stream)
                .sorted()
                .collect(Collectors.toList());

        System.out.println(sortedInterests);

//
//        System.out.println(Collectors.toList().characteristics());
//        System.out.println(Collectors.groupingByConcurrent(a->a).characteristics());
//        System.out.println(Collectors.toConcurrentMap(a->a,a->a).characteristics());

//        - The identity must be defined such that for all elements in the stream u ,
//        - combiner.apply(identity, u) is equal to u .
//
//        - The accumulator operator op must be associative and stateless such that (a op b) op c
//        - is equal to a op (b op c) . 1 + (2 + 3) == (1 + 2) + 3
//
//        - The combiner operator must also be associative and stateless and compatible with the
//        - identity, such that for all u and t combiner.apply(u,accumulator.apply(identity,t))
//                - is equal to accumulator.apply(u,t) .

        String alsoSortedInterests = sortedInterests.stream()
                .unordered()
                .parallel()
                .peek(a-> System.out.println(Thread.currentThread().getName()))
                .reduce("XxX",String::concat,String::concat);

        System.out.println(alsoSortedInterests);

    }
}
