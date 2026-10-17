import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./freelance-story-contributor.css";

const APPLICATION_URL = "https://forms.gle/8ne2SfFkss36xSq9A";

export default function FreelanceStoryContributor() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Freelance Story Contributor | The Real Africa";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <main className="story-contributor">
      <article className="story-contributor__article">
        <header className="story-contributor__header">
          <Link to="/articles" className="story-contributor__back">
            ← All articles
          </Link>
          <p className="story-contributor__eyebrow">Opportunity · Rolling call</p>
          <h1>Help us find the African founder stories we haven’t heard yet</h1>
          <p className="story-contributor__intro">
            The Real Africa is inviting Freelance Story Contributors to pitch
            founders whose work deserves a closer look. We are looking for the
            story you cannot stop thinking about, and the reason it matters now.
          </p>
          <a className="story-contributor__button" href={APPLICATION_URL} target="_blank" rel="noopener noreferrer">
            Submit a story proposal <span aria-hidden="true">↗</span>
          </a>
        </header>

        <div className="story-contributor__body">
          <section>
            <h2>Start with the story</h2>
            <p>
              Our best stories begin with a question worth pursuing. Who is
              building something consequential? What decision, obstacle, or
              turning point has been missed? What can readers learn from the
              founder’s experience beyond a headline or a funding number?
            </p>
            <p>
              We welcome pitches about African founders, including founders
              living abroad whose origins are in Africa. They may be actively
              building or have exited their companies. We are especially
              interested in companies estimated to be worth more than $1
              million. A smaller company can still be a strong pitch; tell us
              why its story merits an exception.
            </p>
          </section>

          <section>
            <h2>How the work happens</h2>
            <ol>
              <li>
                <strong>Pitch a founder.</strong> Use the form to identify the
                founder, select the business size and what the figure measures,
                and explain why we should cover them. The form also lets you
                share how you arrived at the estimate.
              </li>
              <li>
                <strong>Agree on the assignment.</strong> If we approve the
                proposal, we will email you a fee for that story. You can accept
                or decline before any reporting or writing begins.
              </li>
              <li>
                <strong>Report and write.</strong> We will work with you through
                the editorial process to turn the idea into a carefully sourced
                article. Published pieces carry your byline, and you may use
                them in your portfolio. There is no exclusivity period.
              </li>
            </ol>
            <p>
              These are paid, story by story assignments. A pitch is an
              invitation to discuss a story, not a commitment to take an
              assignment or a guarantee of future work.
            </p>
          </section>

          <section>
            <h2>Who can pitch</h2>
            <p>
              Anyone can apply, wherever they live. We especially welcome
              contributors from African countries. You can pitch and write in
              the language that lets you express the story best. What matters
              most is a promising angle and a clear case for why readers should
              pay attention.
            </p>
          </section>

          <section className="story-contributor__apply">
            <h2>Send us the story you see</h2>
            <p>
              In the application form, tell us <strong>why we should cover your
              chosen founder in 150 words or fewer</strong>. The form asks for
              the founder and a business size estimate, too. Answers
              over the 150 word limit will be rejected. Applications are open
              on a rolling basis.
            </p>
            <a className="story-contributor__button" href={APPLICATION_URL} target="_blank" rel="noopener noreferrer">
              Submit your proposal <span aria-hidden="true">↗</span>
            </a>
          </section>
        </div>
      </article>
    </main>
  );
}
