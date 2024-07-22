import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
	const { siteConfig } = useDocusaurusContext();
	return (
		<header className={clsx('hero hero--primary', styles.heroBanner)}>
			<div className="container">
				<Heading as="h1" className="hero__title">
					{siteConfig.title}
				</Heading>
				<p className="hero__subtitle">{siteConfig.tagline}</p>
				<div className={styles.buttons}>
					<Link
						className="button button--secondary button--lg"
						to="/blog">
						Explore Stardust Blog
					</Link>
				</div>
			</div>
		</header>
	);
}

function StardustIntro() {
	return (
		<section className={styles.features}>
			<div className="container">
				<Heading as="h2">Welcome to Stardust</Heading>
				<p>
					Stardust is a personal blog where I share my thoughts, experiences, and insights on various topics.
					From technology to personal growth, join me on this journey of exploration and discovery.
				</p>
			</div>
		</section>
	);
}

export default function Home() {
	const { siteConfig } = useDocusaurusContext();
	return (
		<Layout
			title={`Welcome to ${siteConfig.title}`}
			description="Stardust - A personal blog about technology, life, and everything in between.">
			<HomepageHeader />
			<main>
				<StardustIntro />
				<HomepageFeatures />
			</main>
		</Layout>
	);
}