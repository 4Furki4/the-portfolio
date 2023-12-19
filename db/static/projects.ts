const projects: Project[] = [
  {
    title: {
      en: "Learnification",
      tr: "Learnification",
    },
    endpoint: "Learnification",
    images: [
      {
        src: "/pics/projects/learnification/learnification-getting-started.png",
        alt: "Learnification Getting Started Page Preview",
      },
      {
        src: "/pics/projects/learnification/learnification-home.png",
        alt: "Learnification Home Page Preview",
      },
      {
        src: "/pics/projects/learnification/learnification-search.png",
        alt: "Learnification Search Page Preview",
      },
      {
        src: "/pics/projects/learnification/learnification-my-learning.png",
        alt: "Learnification My Learning Page Preview",
      },
      {
        src: "/pics/projects/learnification/learnification-spesific-course.png",
        alt: "Learnification Spesific Course Page Preview",
      },
      {
        src: "/pics/projects/learnification/learnification-saved.png",
        alt: "Learnification Saved Page Preview",
      },
      {
        src: "/pics/projects/learnification/learnification-course-detail.png",
        alt: "Learnification Course Detail Page Preview",
      },
      {
        src: "/pics/projects/learnification/learnification-signin.png",
        alt: "Learnification Signin Page Preview",
      },
      {
        src: "/pics/projects/learnification/learnification-signup.png",
        alt: "Learnification Signup Page Preview",
      },
      {
        src: "/pics/projects/learnification/learnification-profile.png",
        alt: "Learnification Profile Page Preview",
      },
    ],
    description: {
      en: "Successfully collaborated with a team of four to develop a dynamic Learning App in the capstone project of the Recoded Bootcamp utilizing Agile Methodology and GitHub Projects for Project Management.",
      tr: "Recoded Bootcamp'in bitirme projesi olan bu projede dört kişilik bir ekip ile başarılı bir şekilde çalışarak, Agile Methodology ve GitHub Projects kullanarak Proje Yönetimi gerçekleştirilmiştir.",
    },
    repoLink: "https://github.com/202303-PRM-TR-FEW/Learnification",
    demoLink: "https://learn-u-team-7.vercel.app",
    contributors: [
      {
        name: "Amdjed Belgacem",
        github: "https://github.com/AmdjedBelgacem",
      },
      {
        name: "Tugba Esat Sahin",
        github: "https://github.com/tugbaesat",
      },
      {
        name: "Ebla Ekerdiker",
        github: "https://github.com/eblaekerdiker",
      },
    ],
    status: "completed",
    techStack: [
      { name: "React", url: "https://github.com/facebook/react" },
      { name: "Next.js", url: "https://nextjs.org/" },
      {
        name: "JavaScript",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
      {
        name: "Tailwind CSS",
        url: "https://tailwindcss.com/",
      },
      {
        name: "MongoDB",
        url: "https://www.mongodb.com/",
      },
      {
        name: "AWS S3",
        url: "https://aws.amazon.com/s3/",
      },
      {
        name: "Next Auth",
        url: "https://next-auth.js.org/",
      },
      {
        name: "Next-Intl",
        url: "https://next-intl-docs.vercel.app/",
      },
    ],
  },
  {
    title: {
      en: "Turkish Dictionary (using TDK API)",
      tr: "TDK Sözlük (TDK API kullanarak)",
    },
    endpoint: "Turkish-Dictionary-using-TDK-API",
    images: [
      {
        src: "/pics/projects/turkish-dictionary-angular/turkish-dic-home.png",
        alt: "Turkish Dictionary Home Page Preview",
      },
      {
        src: "/pics/projects/turkish-dictionary-angular/turkish-dic-word-dark.png",
        alt: "Turkish Dictionary Word Page Dark Preview",
      },
      {
        src: "/pics/projects/turkish-dictionary-angular/turkish-dic-word-light.png",
        alt: "Turkish Dictionary Word Page Light Preview",
      },
      {
        src: "/pics/projects/turkish-dictionary-angular/turkish-dic-font.png",
        alt: "Turkish Dictionary Font Option Preview",
      },
    ],
    description: {
      en: "The goal of this project is to improve upon TDK Dictionary (Official Online Turkish Dictionary) by adding new features such as client-side routing and enhancing the user interface.",
      tr: "Bu projenin amacı, TDK Sözlük'ü (Resmi Online Türkçe Sözlük) geliştirerek, istemci tarafı yönlendirmesi gibi yeni özellikler eklemek ve kullanıcı arayüzünü geliştirmektir.",
    },
    repoLink: "https://github.com/4Furki4/Turkish-Dictionary-Client",
    demoLink: "https://turkish-dictionary-client.vercel.app/",
    status: "completed",
    techStack: [
      {
        name: "Angular",
        url: "https://angular.io/",
      },
      {
        name: "TypeScript",
        url: "https://www.typescriptlang.org/",
      },
      {
        name: "SCSS",
        url: "https://sass-lang.com/",
      },
    ],
  },
  {
    title: {
      en: "Meme Generator",
      tr: "Meme Oluşturucu",
    },
    endpoint: "Meme-Generator",
    images: [
      {
        src: "/pics/projects/meme-generator/preview.png",
        alt: "Meme Generator Preview",
      },
      {
        src: "/pics/projects/meme-generator/preview-meme-options.png",
        alt: "Meme Generator Preview Meme Options",
      },
      {
        src: "/pics/projects/meme-generator/preview-extended-settings.png",
        alt: "Meme Generator Preview Extended Settings",
      },
      {
        src: "/pics/projects/meme-generator/preview-fonts.png",
        alt: "Meme Generator Preview Fonts",
      },
      {
        src: "/pics/projects/meme-generator/preview-downloaded-meme.png",
        alt: "Meme Generator Preview Downloaded Meme",
      },
    ],
    description: {
      en: "A meme generator that fetches memes from an API and allows you to add text that you can drag on the meme image and configure many other options in the extended settings.",
      tr: "Bir API'den meme çeken ve metin eklemenize izin veren bir meme oluşturucu. Metni meme resminin üzerinde sürükleyebilir ve genişletilmiş ayarlarda birçok başka seçeneği yapılandırabilirsiniz.",
    },
    repoLink: "https://github.com/4Furki4/Meme-Generator",
    demoLink: "https://meme-generator-4furki4.vercel.app/",
    status: "completed",
    techStack: [
      { name: "React", url: "https://github.com/facebook/react" },
      {
        name: "TypeScript",
        url: "https://www.typescriptlang.org/",
      },
      {
        name: "Tailwind CSS",
        url: "https://tailwindcss.com/",
      },
      {
        name: "Framer Motion",
        url: "https://www.framer.com/motion/",
      },
    ],
  },
  {
    title: {
      en: "Frontend Mentor Challenges",
      tr: "Frontend Mentor Görevleri",
    },
    endpoint: "Frontend-Mentor-Challenges",
    images: [
      {
        src: "/pics/projects/frontend-mentor-challenges/testimonial-grid.png",
        alt: "Testimonial Grid Preview",
      },
      {
        src: "/pics/projects/frontend-mentor-challenges/result-summary.png",
        alt: "Result Summary Preview",
      },
      {
        src: "/pics/projects/frontend-mentor-challenges/clipboard-landing.png",
        alt: "Clipboard Landing Preview",
      },
      {
        src: "/pics/projects/frontend-mentor-challenges/product-preview-card.png",
        alt: "Product Preview Card Preview",
      },
      {
        src: "/pics/projects/frontend-mentor-challenges/signup-form-challenge.png",
        alt: "Signup Form Preview",
      },
      {
        src: "/pics/projects/frontend-mentor-challenges/tip-calculator-challenge.png",
        alt: "Tip Calculator Preview",
      },
      {
        src: "/pics/projects/frontend-mentor-challenges/interactive-rating-component.png",
        alt: "Interactive Rating Component Preview",
      },
      {
        src: "/pics/projects/frontend-mentor-challenges/huddle-landing-page.png",
        alt: "Huddle Landing Page Preview",
      },
      {
        src: "/pics/projects/frontend-mentor-challenges/age-calculator.png",
        alt: "Age Calculator Preview",
      },
      {
        src: "/pics/projects/frontend-mentor-challenges/russian-circles.png",
        alt: "Russian Circles Preview",
      },
      {
        src: "/pics/projects/frontend-mentor-challenges/dictionary-webapp.png",
        alt: "Dictionary Web App Preview",
      },
    ],
    description: {
      en: "Frontend Mentor is a platform that provides real-world challenges to help you improve your coding skills. I have completed 11 challenges so far.",
      tr: "Frontend Mentor, kodlama becerilerinizi geliştirmenize yardımcı olmak için gerçek dünya zorlukları sunan bir platformdur. Şu ana kadar 11 zorluğu tamamladım.",
    },
    repoLink: "https://github.com/4Furki4/Frontend-Projects/",
    status: "in-progress",
    techStack: [
      {
        name: "HTML",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
      },
      {
        name: "CSS",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
      },
      {
        name: "JavaScript",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
      {
        name: "TypeScript",
        url: "https://www.typescriptlang.org/",
      },
      {
        name: "Angular",
        url: "https://angular.io/",
      },
    ],
  },
  {
    title: {
      en: "Turkish Dictionary",
      tr: "Türkçe Sözlük",
    },
    endpoint: "Turkish-Dictionary",
    description: {
      en: "Turkish Dictionary is an open-source website where people can search and save words, and contribute to Turkish!",
      tr: "Turkish Dictionary, insanların Türkçe kelimeleri arayıp kaydedebildiği ve Türkçe'ye katkıda bulunabildiği açık kaynaklı bir web sitesidir!",
    },
    images: [
      {
        alt: "Turkish Dictionary Preview",
        src: "/pics/projects/turkish-dictionary/preview-search.png",
      },
    ],
    repoLink: "https://github.com/4Furki4/Turkish-Dictionary",
    demoLink: "https://turkish-dictionary-chi.vercel.app",
    status: "in-progress",
    techStack: [
      { name: "Next.js", url: "https://nextjs.org/" },
      {
        name: "TypeScript",
        url: "https://www.typescriptlang.org/",
      },
      {
        name: "Tailwind CSS",
        url: "https://tailwindcss.com/",
      },
      {
        name: "MongoDB",
        url: "https://www.mongodb.com/",
      },
      { name: "tRPC", url: "https://trpc.io/" },
      {
        name: "React-Query",
        url: "https://react-query.tanstack.com/",
      },
      {
        name: "Next Auth",
        url: "https://next-auth.js.org/",
      },
      {
        name: "Next-Intl",
        url: "https://next-intl-docs.vercel.app/",
      },
      {
        name: "NextUI",
        url: "https://nextui.org/",
      },
    ],
  },
];

export default projects;
