package io.acari.streams;

import com.google.common.collect.Lists;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class DreamsOfStreams {

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
              .interests(new DreamsOfStreams.Interests(Lists.newArrayList(split[1].split(","))))
              .build();
        })
        .collect(Collectors.toList());

    //create pod with with set, add pod member, and assimilate pod

    Pod pod = podMembersEnhanced.stream()
        .collect(Pod::new, Pod::addPodMumber, Pod::assimatePod);

    System.out.println(pod);

    //add a pod member stream in the pod class and interest stream on pod member

    Set<String> allPodMemberInterests = pod.fetchPodMembers()
        .map(PodMember::getInterests)
        .map(Interests::fetchInterests)
        .peek(stream->{
          System.out.println();
          System.out.println(stream);
        })
        .flatMap(stringStream -> stringStream)
        .peek(System.out::println)
        .collect(Collectors.toCollection(HashSet::new));

    System.out.println(allPodMemberInterests);


    Set<String> interestsSamples = pod.fetchPodMembers()
        .map(PodMember::getInterests)
        .flatMap(Interests::fetchInterests)
        .limit(10)//show that you can limit more than exist in the stream
        .collect(Collectors.toSet());

    System.out.print(interestsSamples.size());

  }

  @Data
  @Builder
  @AllArgsConstructor
  @NoArgsConstructor
  static class Pod {
    private Set<PodMember> podMembers = new HashSet<>();

    public Pod addPodMumber(PodMember podMember){
      podMembers.add(podMember);
      return this;
    }

    public Pod assimatePod(Pod otherPod){//resistance is futile assimilation is eminent
      podMembers.addAll(otherPod.podMembers);
      return this;
    }

    public Stream<PodMember> fetchPodMembers(){
      return podMembers.stream();
    }
  }


  @Data
  @Builder
  static class PodMember {
    private String name;
    private Interests interests;
  }

  @Data
  @AllArgsConstructor
  static class Interests {
    private List<String> coreIntrests;

    public Stream<String> fetchInterests(){
      return coreIntrests.stream();
    }

    public boolean areSane() {
      return coreIntrests.stream().noneMatch(interest->interest.contains("bugs") || interest.contains("spiders"));
    }

    public boolean hasInterest(String interest) {
      final String _interest = interest.toUpperCase();
      return coreIntrests.stream().map(String::toUpperCase)
          .anyMatch(i->i.contains(_interest));
    }
  }
}
