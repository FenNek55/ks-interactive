<template>
  <section class="about" aria-labelledby="about-heading">
    <div class="d-flex align-center ga-4 mb-8">
      <h1 id="about-heading" class="font-weight-bold text-headline-medium mb-0 mt-0">
        More <span class="text-primary">about me</span>
      </h1>
    </div>
    <div class="about-body text-body-large">
      <figure class="about-photo">
        <div class="about-photo__accent bg-primary" aria-hidden="true" />
        <v-img
          class="about-photo__img"
          src="/images/diploma_photo.jpg"
          alt="Karol with his master's thesis outside Uniwersytet WSB Merito Warszawa"
          aspect-ratio="0.67"
          cover
          rounded="sm"
        />
      </figure>

      <p>
        I created my first website for a real business in 2017 while attending a
        technical secondary school, where I studied programming, networking, and
        computer architecture. After that, I knew this was what I wanted to do
        professionally, and every educational and career decision I made was
        directed toward that goal.
      </p>

      <p>
        Shortly after, I moved to Warsaw to pursue an engineering degree in IT
        with a specialization in programming. During my first year, I landed my
        first full-time job as a junior developer at the Polish healthcare
        startup Infermedica. Given its fast-paced environment, it turned out to
        be the perfect starting point for my career. I applied because the first
        framework I ever learned was Django, followed by Vue - which happened to
        be the exact tech stack they were using. I learned about large-scale
        software development and production pipelines, and I had incredible
        opportunities to work with experienced professionals across various
        technologies. I picked up many of these skills on the fly, having
        specifically asked my manager to assign me to as many different projects
        as possible.
      </p>

      <p>
        Four years went by, during which I earned certifications, finished my
        engineering degree, and explored coding hobbies outside of my
        professional work. I built my fair share of smart home solutions using
        ESP32 and Arduino, set up a local home server, and worked on various
        passion projects. Many of those early projects have since been retired
        because, with every one I finished, I learned enough to look back at my
        code and think: "I can do this better next time."
      </p>

      <p>
        After Infermedica, I started my master's degree in project management
        and took on a new role as a Senior Frontend Developer at Skillhabit.
        This allowed me to accelerate my career in exactly the direction I
        wanted. Seeing the "senior" title next to my name gave me a great sense
        of accomplishment, but it also made me realize that tech never stands
        still and that there is still so much for me to learn.
      </p>

      <p>
        Fast forward to today: I build things that interest me, leverage AI in
        ways that accelerate my workflow without replacing my own judgment, and,
        most importantly, I continue to find a lot of joy in learning new things
        that I can apply to my work.
      </p>
    </div>
  </section>
</template>

<style scoped>
.about {
  width: min(100% - 2rem, 48rem);
  margin-inline: auto;
  padding-top: 4.5rem;
  padding-bottom: 4rem;
}

.about-body {
  overflow: auto;
}

.about-body > p {
  margin: 0 0 1rem;
}

.about-body > p:last-child {
  margin-bottom: 0;
}

.about-photo {
  position: relative;
  float: left;
  width: min(42%, 15rem);
  margin: 0.15rem 1.5rem 1rem 0;
  padding: 0 10px 10px 0;
  shape-outside: margin-box;
}

.about-photo__accent {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 0;
  bottom: 0;
  border-radius: 0.25rem;
  z-index: 0;
}

.about-photo__img {
  position: relative;
  z-index: 1;
  width: 100%;
}

@media (max-width: 600px) {
  .about-photo {
    float: none;
    display: block;
    width: min(100%, 18rem);
    margin: 0.25rem auto 1.5rem;
  }
}
</style>
