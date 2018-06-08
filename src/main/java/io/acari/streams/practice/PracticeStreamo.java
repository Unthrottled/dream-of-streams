package io.acari.streams.practice;

import com.google.common.collect.Lists;
import io.acari.streams.Interests;
import io.acari.streams.Pod;
import io.acari.streams.PodMember;

import java.util.*;
import java.util.function.BinaryOperator;
import java.util.function.Function;
import java.util.stream.*;

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

        long count = thereCanOnlyBeOne.entrySet()
                .stream()
                .parallel()
                .unordered()
                .count();

        System.out.println(count);

        System.out.println(Collectors.toList().characteristics());
        System.out.println(Collectors.groupingByConcurrent(a->a).characteristics());
        System.out.println(Collectors.toConcurrentMap(a->a,a->a).characteristics());

//        - The identity must be defined such that for all elements in the stream u ,
//        - combiner.apply(identity, u) is equal to u .
//
//        - The accumulator operator op must be associative and stateless such that (a op b) op c
//        - is equal to a op (b op c) . (1 + 2) + 5 == 1 + (2 + 5)
//
//        - The combiner operator must also be associative and stateless and compatible with the
//        - identity, such that for all u and t combiner.apply(u,accumulator.apply(identity,t))
//                - is equal to accumulator.apply(u,t) .

        List<String> sortedInterests = pod.fetchPodMembers()
                .map(PodMember::getInterests)
                .map(Interests::getCoreInterests)
                .flatMap(List::parallelStream)
                .distinct()
                .sorted()
                .collect(Collectors.toList());

        System.out.println(sortedInterests);

        List<String> sameSortedInterests = sortedInterests.parallelStream()
                .peek((a)-> System.out.println(Thread.currentThread().getName()))
                .collect(()->{
                    System.out.println("creating list!!!");
                    return new LinkedList<>();
                }, LinkedList::add, (listOne, listTwo) -> {
                    System.out.println("Joining lists!!");
                    listOne.addAll(listTwo);
                });

        System.out.println(sameSortedInterests);


        IntStream.rangeClosed(0,10)
        .summaryStatistics();

        double first =
                sortedInterests.stream()
                        .parallel()
                        .mapToDouble(String::length)
                .findAny().getAsDouble();

        System.out.println(first);

        System.out.println("Done");
    }
}
