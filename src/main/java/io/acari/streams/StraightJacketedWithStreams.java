package io.acari.streams;

import com.google.common.collect.LinkedListMultimap;
import com.google.common.collect.Lists;
import com.google.common.collect.Multimap;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class StraightJacketedWithStreams {

  public static void main(String... args) {
    Pod pod = Stream.of((
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
        .collect(Pod::new, Pod::addPodMumber, Pod::assimatePod);

    pod.addPodMumber(PodMember.builder()
        .name("Alex")
        .interests(new Interests(Lists.newArrayList("Imitation,Java,Cobol,Obscure_References".split(","))))
        .build());

    System.out.println(pod);

    Multimap<String, PodMember> thereCanBeMoreThanOne = pod.fetchPodMembers()
        .collect(LinkedListMultimap::create,
            (map, podMember) -> map.put(podMember.getName(), podMember),
            Multimap::putAll);

    System.out.println(thereCanBeMoreThanOne.get("Alex"));

    Map<String, Set<PodMember>> interestsToPodMember = pod.fetchPodMembers()
        .flatMap(podMember -> podMember.getInterests().fetchInterests()
            .map(interest -> new AbstractMap.SimpleEntry<>(interest, podMember)))
        .collect(Collectors.groupingBy(Map.Entry::getKey,
            Collectors.mapping(Map.Entry::getValue, Collectors.toSet())));

    System.out.println(interestsToPodMember);


    //CONCURRENCY
    List<Integer> theNumbersMason = IntStream.rangeClosed(1, 50)
        .boxed()
        .collect(Collectors.toList());

    Optional<Integer> smittyWerbenjagermangensen = theNumbersMason.stream().findAny();
    smittyWerbenjagermangensen.ifPresent(System.out::println);

    IntStream.rangeClosed(0,10)
        .forEach(__->
            theNumbersMason.parallelStream().findAny().ifPresent(System.out::println)//JVM selects the first thread to finish the task and retrieves its data
        );

    //THEN COLLECTIONS
    System.out.println(Collectors.toList().characteristics());
    System.out.println(Collectors.toMap(Function.identity(), Function.identity())
        .characteristics());
    //the only two concurrent
    System.out.println(Collectors.toConcurrentMap(Function.identity(), Function.identity())
        .characteristics());
    System.out.println(Collectors.groupingByConcurrent(Function.identity(), Collectors.toSet())
        .characteristics());


//    start with just a parallel stream, then add the println, then introduce the orderd

//    This method does not actually reorder the elements; it just tells the JVM that if an
//    order-based stream operation is applied, the order can be ignored.

    //move the limit after parallel

    StringBuilder assimilation_is_eminent= Stream.iterate(1, a -> ++a)
        .limit(20)
        .unordered()
        .parallel()
        .map(number -> number + " ")
        .collect(StringBuilder::new, StringBuilder::append, (stringBuilder, otherStringBuilder) -> {
          System.out.println("assimilation is eminent");
          stringBuilder.append(otherStringBuilder);
        });

    System.out.println(assimilation_is_eminent);

    //    Any stream operation that is based on order, including findFirst() , limit() , or
//    skip() , may actually perform more slowly in a parallel environment.
//    This is a result of a parallel processing task being forced to coordinate all of its threads in a synchronized-like
//    fashion.



  }

  @Data
  @Builder
  @AllArgsConstructor
  @NoArgsConstructor
  static class Pod {
    private Set<PodMember> podMembers = new HashSet<>();

    public Pod addPodMumber(PodMember podMember) {
      podMembers.add(podMember);
      return this;
    }

    public Pod assimatePod(Pod otherPod) {//resistance is futile assimilation is eminent
      podMembers.addAll(otherPod.podMembers);
      return this;
    }

    public Stream<PodMember> fetchPodMembers() {
      return podMembers.stream();
    }
  }


  @Data
  @Builder
  static class PodMember {
    private String name;
    private Interests interests;

    public boolean isSane() {
      return interests.areSane();
    }
  }

  @Data
  @AllArgsConstructor
  static class Interests {
    private List<String> coreIntrests;

    public Stream<String> fetchInterests() {
      return coreIntrests.stream();
    }

    public boolean areSane() {
      return coreIntrests.stream()
          .map(String::toLowerCase)
          .noneMatch(interest -> interest.contains("bugs") || interest.contains("spiders"));
    }

    public boolean hasInterest(String interest) {
      final String _interest = interest.toUpperCase();
      return coreIntrests.stream().map(String::toUpperCase)
          .anyMatch(i -> i.contains(_interest));
    }
  }
}
